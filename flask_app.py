from flask import Flask, render_template

app = Flask(__name__)

# rendering category details page
@app.route('/cat_details')
def cat_details():
    return render_template('category_details.html')

# rendering cluster details page
@app.route('/clu_details')
def clu_details():
    return render_template('cluster_details.html')

#rendering home page
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5001)
