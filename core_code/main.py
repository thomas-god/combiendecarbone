# -*- coding: utf-8 -*-
import dash
import dash_core_components as dcc
import dash_html_components as html
import json


def computeGes(values):
    """
        Computes GES emission from a dict of user values and the existing
        modes of transportation.
    """
    with open('transport_modes_ges.json', 'r') as f:
        modes = json.load(f)
    ges = 0
    for key in values:
        ges += values[key] * modes[key]['value']
    return ges


def setEntry(tag, name):
    """
        Creates a dcc.Input object for a given (tag, name) pair.
    """
    return html.Div([
        html.Div([
            html.P(name, style={'align': 'right'})
        ], style={'width': '20%', 'display': 'inline-block'}),
        html.Div([
            dcc.Input(
                id=tag,
                placeholder='Enter a value',
                type='number',
                value='0'
            )
        ], style={'width': '49%', 'display': 'inline-block'})
    ])


def getStates(modes):
    """
        Returns a list of dash.dependencies.State.
        For each transpot mode both the id and the value are returned.
    """
    tmp = []
    for mode in modes:
        tmp += [
            dash.dependencies.State(mode, 'id'),
            dash.dependencies.State(mode, 'value')
        ]
    return tmp


with open('transport_modes_ges.json', 'r') as f:
    modes = json.load(f)

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

server = app.server

app.layout = html.Div(
    [setEntry(mode, modes[mode]['name']) for mode in modes]
    + [
        html.Button('Submit', id='button'),
        html.Div(id='output-container-button',
                children='Enter a value and press submit')
    ]
)


@app.callback(
    dash.dependencies.Output('output-container-button', 'children'),
    [dash.dependencies.Input('button', 'n_clicks')],
    getStates(modes))
def update_output(n_clicks, *args):
    user_input = {}
    for i, var in enumerate(args):
        if i%2 == 0:
            user_input[var] = float(args[i+1])
    ges = computeGes(user_input)
    return f'Emissions annuelles de {ges*365/1e3} kgCO2.'


if __name__ == '__main__':
    app.run_server(debug=True)
