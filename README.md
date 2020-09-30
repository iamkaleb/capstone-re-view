# Re-view

## About

Re-view is a personalized, interactive arena for users to:

1. Save and categorize videos from YouTube, Vimeo, Facebook, or another major video hosting website
2. Create timestamped annotations that will appear alongside the video on subsequent viewings
3. Navigate to these annotated video sections at the push of a button

From college lectures to theatre audition tapes, sports analysis to cooking shows, Re-view was built to enhance your ability to review and analyze videos of any kind.

## How to get started
1. Click the green `code` button at the top of this repo and select `clone repo`. Copy the URL.
2. Open your terminal and navigate to the directory you'd like to use. Enter `git clone` followed by the copied URL.
3. Change to the `api` directory of the cloned repo and open a json server named database.json at port 8088. `json-server -p 8088 -w database.json`
4. Change to the `src` directory and enter `npm start`.

*Note: Authentication for this version of Re-view is a mockup only. Please do not reuse passwords when registering for Re-view*

## Technologies used
- React w/ hooks
- Javascript
- React Router DOM
- ReactPlayer
- CSS
