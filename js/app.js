function post_tweet(event)
{   
    let tweet_body = document.querySelector(`#text_box`)[`value`];
    if(tweet_body === ``)
    {
        document.querySelector(`body`).insertAdjacentHTML(`afterend`, `<p style="opacity: 0; background-color:#fa5252;" id="user_msg">Write something to post!</p>`);
        setTimeout(display_notification, 10);
        setTimeout(remove_notification, 3000);
        return;
    }
    else
    {
        axios.request(
            {
                url: `https://jsonplaceholder.typicode.com/posts`,
                method: `POST`,
                data:
                    {
                        userId: 1,
                        id: 101,
                        title: `a`,
                        body: tweet_body
                    }
            }
        ).then(tweet_success).catch(tweet_error);
    }

}

function tweet_success(res)
{
    document.querySelector(`body`).insertAdjacentHTML(`afterend`, `<p style="opacity: 0; background-color:#339af0; "id="user_msg">Your tweet was posted!</p>`);
    setTimeout(display_notification, 10);
    setTimeout(remove_notification, 3000);
    document.querySelector(`#text_box`)[`value`] = ``;
}

function display_notification(event)
{
    document.querySelector(`#user_msg`)[`style`][`opacity`] = `1`;
}

function remove_notification(event)
{
    document.querySelector(`#user_msg`)[`style`][`opacity`] = `0`;
}

function tweet_error(err)
{
    document.querySelector(`body`).insertAdjacentHTML(`afterend`, `<p style="opacity: 0; background-color:#fa5252;" id="user_msg">Something went wrong. Try again!</p>`);
    setTimeout(display_notification, 10);
    setTimeout(remove_notification, 3000);
}

let tweet_button = document.querySelector(`#submit_button`);
tweet_button.addEventListener(`click`, post_tweet);