/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const main = require('../src/main')

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug').mockImplementation()
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Other utilities
const timeRegex = /^\d{2}:\d{2}:\d{2}/

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // it('sets the time output', async () => {
  //   // Set the action's inputs as return values from core.getInput()
  //   getInputMock.mockImplementation(name => {
  //     switch (name) {
  //       case 'milliseconds':
  //         return '500'
  //       default:
  //         return ''
  //     }
  //   })

  //   await main.run()
  //   expect(runMock).toHaveReturned()

  //   // Verify that all of the core library functions were called correctly
  //   expect(debugMock).toHaveBeenNthCalledWith(1, 'Waiting 500 milliseconds ...')
  //   expect(debugMock).toHaveBeenNthCalledWith(
  //     2,
  //     expect.stringMatching(timeRegex)
  //   )
  //   expect(debugMock).toHaveBeenNthCalledWith(
  //     3,
  //     expect.stringMatching(timeRegex)
  //   )
  //   expect(setOutputMock).toHaveBeenNthCalledWith(
  //     1,
  //     'time',
  //     expect.stringMatching(timeRegex)
  //   )
  // })

  // it('sets a failed status', async () => {
  //   // Set the action's inputs as return values from core.getInput()
  //   getInputMock.mockImplementation(name => {
  //     switch (name) {
  //       case 'milliseconds':
  //         return 'this is not a number'
  //       default:
  //         return ''
  //     }
  //   })

  //   await main.run()
  //   expect(runMock).toHaveReturned()

  //   // Verify that all of the core library functions were called correctly
  //   expect(setFailedMock).toHaveBeenNthCalledWith(
  //     1,
  //     'milliseconds not a number'
  //   )
  // })

  it('fails if no token is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'token':
          throw new Error('Input required and not supplied: token')
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: token'
    )
  })

  it('fails if no title is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'title':
          throw new Error('Input required and not supplied: title')
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: title'
    )
  })

  it('accepts a title', async () => {
    // Accepts the action's title input as return value from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'title':
          return 'Check this out'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(1, 'Title: Check this out')
  })

  it('accepts a body', async () => {
    // Accepts the action's body input as return value from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'body':
          return 'This would cool...!'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(2, 'Body: This would cool...!')
  })

  it('accepts zero assignees', async () => {
    // Accepts the action's assignee input as return value from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'assignees':
          return ''
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(3, '@: undefined')
  })

  it('accepts ONE assignee', async () => {
    // Accepts the action's assignee input as return value from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'assignees':
          return 'alice'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(3, '@: ["alice"]')
  })

  it('accepts a couple of assignees', async () => {
    // Accepts the action's assignee input as return value from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'assignees':
          return 'alice\nbob'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(3, '@: ["alice","bob"]')
    // expect(debugMock).toHaveBeenNthCalledWith(
    //   2,
    //   expect.stringMatching(timeRegex)
    // )
    // expect(debugMock).toHaveBeenNthCalledWith(
    //   3,
    //   expect.stringMatching(timeRegex)
    // )
    // expect(setOutputMock).toHaveBeenNthCalledWith(
    //   1,
    //   'time',
    //   expect.stringMatching(timeRegex)
    // )
  })
})
