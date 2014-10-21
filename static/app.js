/** @jsx React.DOM */

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
				<div className="post">
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
				<p>{comment.body}</p>
			)
		});
		return (
			<div className="comments">
				{nodes}
			</div>
		);
	}
});

/*var comment = React.createClass({ I'll have use for you yet...
	render: function(){
		return (
			<p className="comment">
				comment
			</p>
		);
	}
});*/

React.renderComponent(
	<Post />,
	document.getElementById('issue')
)