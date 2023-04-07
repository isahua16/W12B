// ------------------------------------ Post function ----------------------------------------------

function post_tweet(event)
{   
    let tweet_body = document.querySelector(`#text_box`)[`value`];
    if(tweet_body === ``)
    {
        display_error_message(`Write something to post!`);
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
    display_success_message(`Your tweet was posted`)
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
    display_error_message(`Something went wrong. Try again!`);
}

function display_success_message(message)
{
    document.querySelector(`body`).insertAdjacentHTML(`afterend`, `<p style="opacity: 0; background-color:#339af0; "id="user_msg">${message}</p>`);
    setTimeout(display_notification, 10);
    setTimeout(remove_notification, 3000);
}

function display_error_message(message)
{
    document.querySelector(`body`).insertAdjacentHTML(`afterend`, `<p style="opacity: 0; background-color:#fa5252;" id="user_msg">${message}</p>`);
    setTimeout(display_notification, 10);
    setTimeout(remove_notification, 3000);
}

let tweet_button = document.querySelector(`#submit_button`);
tweet_button.addEventListener(`click`, post_tweet);

// ------------------------------------ Get function ----------------------------------------------

function get_tweets_success(res)
{
    for(let i = 0; i < res[`data`].length; i++)
    {
        tweet_container.insertAdjacentHTML(`beforeend`, 
        `<article class=tweet_card>
            <h4>@${res[`data`][i][`userId`]}</h4>
            <p>${res[`data`][i][`body`]}</p>
        </article>`
        );
    }
}

function get_tweets_error(err)
{
    display_error_message(`Something is wrong. Refresh the page`)
}

let tweet_container = document.querySelector(`#tweet_container`);

axios.request(
    {
        url: `https://jsonplaceholder.typicode.com/posts`,
    }
).then(get_tweets_success).catch(get_tweets_error);
