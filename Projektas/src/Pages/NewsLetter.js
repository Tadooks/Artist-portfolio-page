import React from 'react'
import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "https://youtube.us8.list-manage.com/subscribe/post?u=a2dd2bb701b0336427af6036d&amp;id=9327e1f605";
// simplest form (only email)
const SimpleForm = () => <MailchimpSubscribe url={url}/>

const NewsLetter = () => {
  return (
    <div className="Page">
        <h1 className="temp">Mail subscription form</h1>
        <div className="temp2">
        <div className='subscription'>
        <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <div>
        <SimpleForm onSubmitted={formData => subscribe(formData)} />
        {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
        {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
        {status === "success" && <div style={{ color: "green" }}>Check your email!</div>}
      </div>
    )}
  />
  </div>
    </div>
    </div>
  )
}



export default NewsLetter