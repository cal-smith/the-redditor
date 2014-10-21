/** @jsx React.DOM */
var md = new Showdown.converter();
var Post = React.createClass({
	load: function(){
		ajax.send({url: '/json', json: true}, function(data){
			this.setState({data: data});
		}.bind(this));
	},
	getInitialState: function(){
		return {data: []};
	},
	componentDidMount: function(){
		this.load();
	},
	render: function(){
		var nodes = this.state.data.map(function(posts){
			return (
				<div key={posts.id} className="post">
					<h4>{posts.title}</h4>
					<Comments data={posts.comments}></Comments>
				</div>
			)
		});
		return (
			<div>
				{nodes}
			</div>
		)
	}
});

var Comments = React.createClass({
	render: function(){
		var nodes = this.props.data.map(function(comment){
			return (
				<div key={comment.id}>
					<Comment body={comment.body} />
				</div>
			)
		});
		return (
			<div className="comments">
				{nodes}
			</div>
		)
	}
});

var Comment = React.createClass({ //I'll have use for you yet...
	render: function(){
		var body = md.makeHtml(this.props.body);
		return (
			<span className="comment" dangerouslySetInnerHTML={{__html: body}} />
		)
	}
});

React.renderComponent(
	<Post />,
	document.getElementById('issue')
)