# Scholar

Scholar is a Chrome extension designed to empower users by enhancing their research and writing processes. This extension, appearing as a discreet right-hand side panel, integrates information directly from the web pages being viewed and any documents provided by the user.

The core mission of Scholar is to enhance user activity on the internet. Unlike ChatGPT, which can generate content from scratch, our extension aims to refine and elevate users' existing writing. We focus on amplifying the user's original voice and intention, providing advice that boosts the text's clarity and style without overshadowing the user's unique expression. Our goal is to alleviate the anxiety associated with research and writing tasks, fostering a more enjoyable and productive journey.

## Advisory, Not Authorial

Scholar differentiates itself by offering guidance to enhance users' existing writing rather than authoring content on their behalf. This approach ensures that while the quality of text is improved, the integrity and originality of the user's voice are preserved.

## Adding the extension to Chrome Browser

To install the "Scholar" extension in your Chrome browser and start enhancing your research and writing process, follow these steps:

1. Visit *chrome://extensions/*
2. turn on the toggle for "**Developer mode**" at the top right
3. Click "**Load unpacked**" and select your extension's folder
4. **Scholar** should now appear in the extensions list and be ready to use.

With these steps, you should have Scholar set up and running. Dive into your research and writing tasks with enhanced confidence and support!



## Obtaining API Keys

### Nature Springer Key
To access your API key for Nature Springer, please visit [Nature Springer API](https://www.springeropen.com/get-published/indexing-archiving-and-access-to-data/api).

1. Register or log in to create an account.
2. Navigate to the API section and apply for an API key for the services you intend to use.
3. Once approved, your API key will be available on your dashboard.

### Google Scholar Key

_Google Scholar does not officially provide an API or an API key. However, you can access limited data from Google Scholar using THE third-party scraping API called SERP:_

To access your API key for Google Scholar, please visit [SerpAPI](https://serpapi.com/). 


## backend deployment
we deployed our backend to railway, it is set up to auto-redeploy when we push to repo similar to this [article](https://faun.pub/deploy-a-fastapi-website-to-railway-c08df2a1e878). Our backend is made using FastAPI, it relies heavily on OpenAI to power our AI.

## links

[Training data for scholar](https://huggingface.co/datasets/sruly/Scholar)

[Private backend code](https://github.com/codeForX/ScholarBackend) (private repo)

[Public backend code](https://github.com/codeForX/Scholar-Backend) (public, however some code may be misattributed)

[Unused search llm dataset](https://huggingface.co/datasets/sruly/search_training_data.csv)

[API endpoint](https://fastapi-production-9440.up.railway.app/)


### Dive into your research and writing tasks with enhanced confidence and support, facilitated by the Scholar extension!

