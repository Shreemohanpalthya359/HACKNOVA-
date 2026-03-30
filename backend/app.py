from flask import Flask
from flask_cors import CORS
from routes.api import api_bp


def create_app():
    app = Flask(__name__)

    # Enable CORS
    CORS(app)

    # Register Blueprint
    app.register_blueprint(api_bp, url_prefix="/api")

    @app.route("/")
    def index():
        from flask import redirect
        return redirect("/api/")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)