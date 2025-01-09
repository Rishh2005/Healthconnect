import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// Set the runtime to edge for best performance
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful medical assistant for HealthConnect, a healthcare management system. Provide concise and helpful responses to user queries about health and the HealthConnect system.'
      },
      ...messages
    ]
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}

