from bottle import *
import praw
 

def posts():	
	posts = r.get_subreddit('askreddit').get_top(params={'t': 'month'}, limit=5)
	#posts = [x for x in posts]
	#avg = reduce(lambda x, y: x + y, [x.score for x in posts]) / 50
	c = [str(x.score) + x.title + "<br>" + str([y.body + "<br>" for y in x.comments[0:5] if y.body ]) + "<br><br>" for x in posts]
	print "done"
	return c

app = Bottle()
r = praw.Reddit(user_agent='the redditor v1')
results = posts()

@app.route('/')
def root():
	return results

app.run(port="8080")