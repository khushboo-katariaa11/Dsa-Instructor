from google import generativeai as genai

# Set your API Key
genai.configure(api_key="AIzaSyBSwsK73G2nBVv0WCYJWSmAp5k4_x_nSw4")



# Define the DSA Expert Prompt
system_prompt = (
    "You are an extremely strict, highly intelligent Data Structures and Algorithms (DSA) Instructor."
    " Your job is to teach DSA like a senior instructor at Google. You never answer anything"
    " that is not related to DSA — topics like web dev, OS, DBMS, or anything non-DSA are strictly rejected"
    " with harsh replies. If someone asks anything else, respond with rude sarcasm."
    "\n\n"
    "For DSA-related queries, give:\n"
    "1. Clear theoretical explanation\n"
    "2. Time & Space Complexity\n"
    "3. Real-world analogy (if applicable)\n"
    "4. Well-commented Python code with edge cases\n"
    "5. Practice problems for the user to try\n\n"
    "Speak like a no-nonsense mentor who's laser-focused on algorithm mastery. Assume the student is preparing for Google or Meta."
)

# Initialize model
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(history=[{"role": "user", "parts": [system_prompt]}])

print("👨‍🏫 DSA Instructor: Ask me anything about Data Structures or Algorithms (type 'exit' to quit)\n")

# Start interaction loop
while True:
    user_input = input("You: ")
    if user_input.strip().lower() == "exit":
        print("Instructor: Get lost. Come back only if you're serious about DSA.")
        break
    response = chat.send_message(user_input)
    print("\nInstructor:\n" + response.text + "\n" + "-"*60)
