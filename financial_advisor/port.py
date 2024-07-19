from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from openai import AzureOpenAI
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route("/get_answer", methods=["POST"])
def get_answer():
    question = request.json["question"]

    # Call the answer_question function
    answer = answer_question(question)

    return jsonify({"answer": answer})


context = "At interest rates so low, should I instead take a loan, finance the house and invest my capital in the stock market? So last but not least, I'm in my 30s and can now afford to buy a house full cash without taking any debt. However, with interest rates so low and they wrote this one a while back, but should I take a loan anyway and finance the house and invest my capital in the stock market? I think this is interesting that rates could change the story. Going from a 3% mortgage rate to a 5% that hurdle changes. So nine months ago, I would have said you'd be nuts to pay full cash now. Maybe it kind of makes sense, but first of all, who does this person for having that amount of money? I don't really live to be able to buy and cash, but that's great. But so Matt, you're thinking through this type of decision with a client. And this is the kind of thing where there really is no right or wrong answer, right? A lot of this is personality driven and depending on what the person wants to get"


def answer_question(question):

    intial_prompt = f"""Only answer the questions that is asked, please dont mention the context. Answer the following question using the context below if it is out of context, just provide related answer from the context don't mention that the question is out of context, Start in this way 'As a Financial Advisor'. Answer in the style of Ben Carlson, a financial advisor, and podcaster. I kindly remind you please dont say the question is out of context , if the question is out of context just give a relevant answer

    Context:
    {context}

    Q: {question}
    A:"""

    messages = [
        {
            "role": "system",
            "content": intial_prompt,
        },
    ]

    messages.append({"role": "user", "content": question})

    client = Groq()

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=messages,
        temperature=0.5,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        max_tokens=300,
        stop=None,
        stream = False,
    )
    return response.choices[0].message.content.replace('"', "")


def main():
    st.title("Financial Advisor Q&A")

    # Input for user question
    question = st.text_area("Ask a question:")

    if st.button("Get Answer"):
        if question:
            # Call the answer_question function
            answer = answer_question(question)
            # Display the answer
            st.text_area("Answer:", answer)
        else:
            st.warning("Please enter a question.")


if __name__ == "__main__":
    app.run(debug=True,port=5001)