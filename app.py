from flask import Flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

users = [
    {
        "name": "Nicholas",
        "age": 42,
        "occupation": "Network engineer"
    },
    {
        "name": "Elvin",
        "age": 32,
        "occupation": "Doctor"
    },
    {
        "name": "Jass",
        "age": 22,
        "occupation": "Web developper"
    }
]

class User(Resource):
    def get(self, name):
        """
            Return user's information if name is in the list of users.
        """
        for user in users:
            if user["name"] == name:
                return user, 200
        return "User not found", 404


    def post(self, name):
        """
            Add a new user to the list if there is no user with name already in
            the list of users.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("age")
        parser.add_argument("occupation")
        args = parser.parse_args()

        for user in users:
            if user["name"] == name:
                return "User with name {} already exists.".format(name), 400

        user = {
            "name": name,
            "age": args["age"],
            "occupation": args["occupation"]
        }
        users.append(user)
        return user, 201


    def put(self, name):
        """
            Add a new user to the list. If there is already a user with name
            in the list of users, updates its information.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("age")
        parser.add_argument("occupation")
        args = parser.parse_args()

        for user in users:
            if user["name"] == name:
                user["age"] = args["age"]
                user["occupation"] = args["occupation"]
                return user, 200

        user = {
            "name": name,
            "age": args["age"],
            "occupation": args["occupation"]
        }
        users.append(user)
        return user, 201


    def delete(self, name):
        """
            Delete user with name in the list of users.
        """
        global users
        users = [user for user in users if user["name"] != name]
        return "User {} is deleted.".format(name), 200


api.add_resource(User, "/user/<string:name>")

app.run(debug=True)
