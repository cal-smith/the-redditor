import praw
#sqlalchemy

def posts(sub):	
	posts = r.get_subreddit(sub).get_top(params={'t': 'month'}, limit=5)
	#posts = [x for x in posts]
	#avg = reduce(lambda x, y: x + y, [x.score for x in posts]) / 50
	c = [str(x.score) + x.title + "<br>" + str([y.body + "<br>" for y in x.comments[0:5] if y.body ]) + "<br><br>" for x in posts]
	print "done"
	return c

'''
post
id(text - reddit id)
title(text)
md(text)
score(int)
posted(date)
stored(date)

comments
id(text - reddit id)
md(text)
score(int)
posted(date)
stored(date)

issue
number(int - auto increment?)
date(date - set when we start scraping reddit)
released(true/false)

'''

askreddits = ['askreddit', 'askscience']#store the root comments, and original question
ama = ['iama']#store only the root comments with op responses, and submission title/text
pic = ['pics']#link to the picture, highlight any op comments, top couple comments

app = Bottle()
r = praw.Reddit(user_agent='the redditor v1')
results = posts(askreddits[0])