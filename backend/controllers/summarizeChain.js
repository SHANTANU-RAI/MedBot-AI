const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");

/**
 * Creates a chain to summarize the entire conversation session
 * @param {string} conversationHistory - The full user-bot conversation history
 * @param {string} userEmail - The user's email for contextual reference
 * @returns {Promise<string>} A summary of the conversation
 */
async function createSummarizeChain(conversationHistory, userEmail) {
    try {
        // Initialize LLM - using Groq as in your original code
        const groq = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY || "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", 
            model: "deepseek-r1-distill-llama-70b", 
            temperature: 0.3, // Lower temperature for more focused summarization
        });

        // Create summary prompt template
        const summaryPrompt = ChatPromptTemplate.fromTemplate(`
            You are an expert medical conversation analyst. Your task is to create a comprehensive yet concise 
            summary of a medical chatbot conversation between a user and MedBot (an AI medical assistant).
            
            The summary should:
            1. Highlight the main medical topics discussed
            2. Note any symptoms or conditions mentioned
            3. Summarize advice or explanations provided by the bot
            4. Identify any follow-up actions recommended to the user
            5. Maintain medical accuracy while being concise
            
            Conversation History:
            ==================
            ${conversationHistory}
            ==================
            
            Please provide a professional medical conversation summary in 3-5 key points.
        `);

        // Create and execute the chain
        const chain = summaryPrompt.pipe(groq).pipe(new StringOutputParser());
        
        console.log(`🔄 Executing summary chain for ${userEmail}...`);
        const result = await chain.invoke({});
        
        return result;
    } catch (error) {
        console.error("🔥 ERROR: Failed to generate conversation summary", error);
        return "Unable to generate conversation summary due to an error.";
    }
}

module.exports = { createSummarizeChain };