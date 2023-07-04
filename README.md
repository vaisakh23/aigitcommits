<div align="center">
  <div>
    <h1 align="center">AiGitCommit</h1>
  </div>
	<p>A CLI that generate git commit messages with openAi.</p>
	<a href="https://www.npmjs.com/package/aigitcommit"><img src="https://img.shields.io/npm/v/aigitcommit" alt="Current version"></a>
</div>

## Setup

1. Install _aicommits_:

    ```sh
    npm i -g aigitcommit
    ```
    
2. Set the key so aicommits can use it:

   Retrieve your API key from [OpenAI](https://platform.openai.com/account/api-keys)
   
    ```sh
    gitcommit config OPENAI_KEY=<your token>
    ```

    This will create a `.gitcommit` file in your home directory.

## Usage

You can call `gitcommit` directly to generate a commit message for your staged changes:

```sh
git add <files...>
gitcommit
```
