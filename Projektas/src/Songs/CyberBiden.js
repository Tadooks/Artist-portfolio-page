import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';



const CyberBiden = ({socket}) => {


	  const [inputs, setInputs] = useState({});

	  const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	  }
	
	  const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);
		if(inputs.name && inputs.comment && inputs.rating){
			socket.emit('add_comment',{
				songID: "CyberBiden",
				name: inputs.name,
				rating: inputs.rating,
				comment: inputs.comment
			});
		}

	  }		

	const [list, setList] = useState(
		{
		rating: 0,
		listOfComments: []
		}
	);

	useEffect(() => {
		if( !socket) return;//fix crash on page refresh
		const allComments = (message) => {
			let realRating = 0;
			message.forEach((el)=>{
				realRating += Number(el.rating);
			})
			setList({
				rating: realRating,
				listOfComments: message
				});
		};

		const addedNewComment = (message) => {
			//Decending
			//setArray(oldArray => [...oldArray, message]);
			//Assending
			if(message.songID == "CyberBiden"){
				setList((oldArray) =>{
					const newList = [message,...oldArray.listOfComments];
					let realRating = 0;
					newList.forEach((el)=>{
						realRating += Number(el.rating);
					});
					return {rating: realRating , listOfComments: newList}
				});
			}
		};

		socket.on('get_all_comments_react', allComments);
		socket.on('added_comment', addedNewComment);

		socket.emit('get_all_comments',"CyberBiden");
	
		return () => {
		  socket.off('get_all_comments_react', allComments);
		  socket.off('added_comment', addedNewComment);
		};
	}, [socket]);



	//hide thingy
	const [show, setShow] = useState(false);





return (
	
	<div className='openedsong'>

	    <h2>CyberBiden</h2>
		<div>
			Genre: midtempo
			<br></br>
			Release date: 2021
		</div>
		<br></br>
		
		
		<iframe width="50%" height="380" 
		src="https://www.youtube.com/embed/QuD2i58SQmY" 
		title="YouTube video player" frameborder="0" 
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
		allowfullscreen>
		</iframe>

		{/* links hiddable kaip buttons padary auto nes dabar atrodo cluttered */}
		<h2> </h2>

		<button className="button button1" type="button" onClick={()=>setShow(!show)}><b>Links</b></button>
		{
			show && 
			<div>
				<br/>
				<iframe src="https://open.spotify.com/embed/track/7uVT9qpnGg5m923z6qgRK3?utm_source=generator" width="50%" height="80" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
				<br/>
				<br/>
				<iframe width="50%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1102858123&color=%23744270&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
			
			</div>
		}
		

		

		
		

		<br/>
		<h3>Leave some feedback!</h3>

		<form onSubmit={handleSubmit}>
		<Rating
			name="rating"
			value={inputs.rating || 5}
			onChange={handleChange}
      	/>
      <p>
		<label >&nbsp;Enter your name: &nbsp;
		<input 
			maxlength="20" 
			className="textboxName"
			type="text" 
			name="name" 
			value={inputs.name || ""} 
			onChange={handleChange}
		/>
		</label>
	  </p>
		<textarea
		  maxlength="100" 
		  className="textboxclass" 
		  id="comment" 
		  name="comment" rows="4" cols="50"
		  value={inputs.comment || ""} 
		  onChange={handleChange}>
				Your comment goes here
			</textarea>
		<p>
        <input className="button2 button1" type="submit" value="Post comment"/>
		</p>






    </form>

		<h3>Comments:</h3>
		<div>Average user rating: &nbsp;
		{  
			Number.parseFloat(list.rating/list.listOfComments.length).toFixed(2)
		}
		</div>
		Number of comments: &nbsp;
		{  
			list.listOfComments.length
		}

    <ul>
	{  
			list.listOfComments.map((comment) =>
				<li key={comment.id}>
					<div>
						<b>Name: </b> {comment.name}
						
					</div>
					<div>
						{/* <b>Rating:</b> {comment.rating} */}
						<p>
							<Rating className='CommentRating'
							name="rating"
							value={comment.rating}
							onChange={handleChange}
							/>
						</p>
							
						<p></p>
					</div>
					<li>
						<div>
							<b> </b> {comment.comment}
						</div>
					</li>
				</li>
				)

            }
	</ul>


	</div>
)
}

export default CyberBiden
