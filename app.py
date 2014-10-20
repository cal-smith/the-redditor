from bottle import *
import praw

app = Bottle()
r = praw.Reddit(user_agent='the redditor v1')

@app.route('/')
def root():
	return posts()

def posts():	
	posts = r.get_subreddit('askreddit').get_top(params={'t': 'month'}, limit=50)
	#return [x.selftext + "\n<br><br>" for x in posts]
	posts = [x for x in posts]
	avg = reduce(lambda x, y: x + y, [x.score for x in posts]) / 50
	return [str(x.score) + x.title +"<br>"+ x.selftext + "\n<br><br>" for x in posts if x.score > avg]

app.run(port="8080")