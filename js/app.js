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
    if(document.querySelector(`#user_msg`))
    {
        document.querySelector(`#user_msg`).remove();
    }
    
    document.querySelector(`body`).insertAdjacentHTML(`afterend`, `<p style="opacity: 0; background-color:#339af0; "id="user_msg">${message}</p>`);
    setTimeout(display_notification, 10);
    setTimeout(remove_notification, 3000);
}

function display_error_message(message)
{
    if(document.querySelector(`#user_msg`))
    {
        document.querySelector(`#user_msg`).remove();
    }
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

// ------------------------------------ Patch function ----------------------------------------------

function edit_tweet(event)
{
    axios.request(
        {
            url: `https://jsonplaceholder.typicode.com/posts/1`,
            method: `PATCH`,
            data: 
                {
                    body: `Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists. Yes, Yes, without the oops! Checkmate... Life finds a way. Did he just throw my cat out of the window? Hey, take a look at the earthlings. Goodbye! You really think you can fly that thing?`,
                }
        }
    ).then(edit_tweet_success).catch(edit_tweet_error);
}

function edit_tweet_success(res)
{
    display_success_message(`Updated tweet succesfully`);
}

function edit_tweet_error(err)
{
    display_error_message(`Failed to edit the tweet`);
}

let edit_button = document.querySelector(`#edit_button`);
edit_button.addEventListener(`click`, edit_tweet);

// ------------------------------------ Delete function ----------------------------------------------

function delete_tweet(event)
{
    axios.request(
        {
            url: `https://jsonplaceholder.typicode.com/posts/1`,
            method: `DELETE`,
        }
    ).then(delete_tweet_success).catch(delete_tweet_error);
}

function delete_tweet_success(res)
{
    display_success_message(`Deleted tweet succesfully`);
}

function delete_tweet_error(err)
{
    display_error_message(`Failed to delete the tweet`);
}

let delete_button = document.querySelector(`#delete_button`);
delete_button.addEventListener(`click`, delete_tweet);