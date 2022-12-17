import { extend } from 'umi-request'
import { notification } from 'antd'

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'Create or modify data successfully.',
  202: 'A request has been queued in the background (asynchronous task).',
  204: 'Delete data successfully.',
  400: 'There was an error in the request sent, and the server did not create or modify data.',
  401: 'User does not have permissions (wrong token, username, password).',
  403: 'The user is authorized, but access is prohibited.',
  404: 'A request was made for a record that does not exist, no action was taken by the server.',
  406: 'The requested format is not available.',
  410: 'The requested resource is permanently deleted and will not be available again.',
  422: 'A validation error occurred while creating an object.',
  500: 'An error occurred on the server, please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable, the server is temporarily overloaded or under maintenance.',
  504: 'Gateway timed out.',
}

/**
 * If the response status is in the codeMessage object, then the error message is the value of the
 * status key in the codeMessage object, otherwise the error message is the response statusText
 *
 * @param error { response: Response }
 *
 * @return The response object is being returned.
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response

    notification.error({
      message: `Wrong request ${status}: ${url}`,
      description: errorText,
    })
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal, unable to connect to the server',
      message: 'Network anomaly',
    })
  }
  return response
}

/* Extending the request object with errorHandler and credentials. */
const request = extend({
  errorHandler,
  credentials: 'include',
})

export default request
