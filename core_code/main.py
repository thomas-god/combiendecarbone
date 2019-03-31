# -*- coding: utf-8 -*-
import dash
import dash_core_components as dcc
import dash_html_components as html
import plotly.graph_objs as go
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
            html.P(name, style={'text-align': 'left'})
        ], style={'width': '50%', 'display': 'inline-block'}),
        html.Div([
            dcc.Input(
                id=tag,
                placeholder='Enter a value',
                type='number',
                value='0'
            )
        ], style={'width': '50%', 'display': 'inline-block', 'text-align': 'center'})
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
    [html.H3(children='Nombre de kilomètres quotidiens')]
    + [html.Div(
        children=[setEntry(mode, modes[mode]['name']) for mode in modes],
        style={
            'width': '50%', 'height': '500px', 'display': 'inline-block',
            'overflow': 'scroll'
        }
    )]
    + [html.Div(
        children=[
            html.Button(id='button', children='Submit'),
            html.Div(id='output-container-button',
                children='Enter a value and press submit'),
            html.Div(id='graph_container', children=dcc.Graph(id='ges_graph'))
        ],
        style={'width': '50%', 'display': 'inline-block', 'vertical-align': 'top', 'horizontal-align': 'center'}
    )]
)


@app.callback(
    [dash.dependencies.Output('output-container-button', 'children'),
    dash.dependencies.Output('graph_container', 'style'),
    dash.dependencies.Output('ges_graph', 'figure')
    ],
    [dash.dependencies.Input('button', 'n_clicks')],
    getStates(modes))
def update_output(n_clicks, *args):
    user_input = {}
    for i, var in enumerate(args):
        if i%2 == 0:
            user_input[var] = float(args[i+1])
    ges = computeGes(user_input)
    if ges > 0:
        with open('transport_modes_ges.json', 'r') as f:
            modes = json.load(f)
        display = {'display': 'block'}
        labels = []
        values = []
        for key in user_input:
            if user_input[key] > 0:
                labels += [modes[key]['name']]
                values += [user_input[key] * modes[key]['value']]
        figure = {
            'data': [{
                'labels': labels,
                'values': values,
                'type': 'pie',
                'hoverinfo': 'label+percent',
                'name': 'ges'
            }],
            'layout': { 'title': 'Vos emmissions de CO2.'}
        }
    else:
        display = {'display': 'none'}
        figure = {
            'data': [{'labels': [], 'values': [], 'type': 'pie', 'name': ges}],
            'layout': { 'title': 'Vos emmissions de CO2.'}
        }
    return f'Vos emmissions annuelles sont de {ges*365/1e3:.2f} kg de CO2.', display, figure


if __name__ == '__main__':
    app.run_server(debug=True)
