const core = require('@actions/core')
const github = require('@actions/github')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const token = core.getInput(token)
    const title = core.getInput(title)
    const body = core.getInput(body)
    const assignees = core.getInput(assignees)

    const octokit = github.getOctokit(token)

    const response = await octokit.rest.issues.create({
      // owner: github.context.repo.owner,
      // repo: github.context.repo.repo,
      ...github.context.repo,
      title,
      body,
      assignee: assignees ? assignees.split('\n') : undefined
    })

    core.setOutput('issue', response.data)
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
