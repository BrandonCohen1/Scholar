# Scholar

Scholar is a Chrome extension designed to empower users by enhancing their research and writing processes. This extension, appearing as a discreet right-hand side panel, integrates information directly from the web pages being viewed and any documents provided by the user.

The core mission of Scholar is to enhance user activity on the internet. Unlike ChatGPT, which can generate content from scratch, our extension aims to refine and elevate users' existing writing. We focus on amplifying the user's original voice and intention, providing advice that boosts the text's clarity and style without overshadowing the user's unique expression. Our goal is to alleviate the anxiety associated with research and writing tasks, fostering a more enjoyable and productive journey.

## Advisory, Not Authorial

Scholar differentiates itself by offering guidance to enhance users' existing writing rather than authoring content on their behalf. This approach ensures that while the quality of text is improved, the integrity and originality of the user's voice are preserved.

## Usage

To get started, follow these steps:

1. Environment setup
  - Change `.env.example` file name to `.env`
  - Add your OpenAI API key in the .env file like so:

    ```phyton
    OPENAI_API_KEY = "your_api_key_here"
    ```


2. Getting OpenAI API_KEY
  - Visit [OpenAI](https://platform.openai.com/docs/introduction), and log in or register.
  - Navigate to the API Keys section and click on **create new secret keys**.
  - Copy the generated secret key and paste it into your '**.env**' file.


## Deployment

To deploy Scholar locally:

1. Install Dependencies:
  - Run the following command in the project's root directory to install necessary dependencies

      ```bash
      npm install
      ```

2. Start the Server
  - Use '**nodemon**' to run your server for live reloading during development
  
    ```bash
    npm run dev
     ```

## Adding extension to Chrome Browser

To install the "Scholar" extension in your Chrome browser and start enhancing your research and writing process, follow these steps:

1. Visit *chrome://extensions/*
2. Tuen on the toogle for "**Developer mode**" at the top right
3. Click "**Load unpacked**" and select your extension's folder
4. **Scholar** should now appear in the extensions list and be ready to use.

With these steps, you should have Scholar set up and running. Dive into your research and writing tasks with enhanced confidence and support!