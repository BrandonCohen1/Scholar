from typing import Union

from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.get("/")
def read_root():

    return "welcome to the API"

@app.get("/search/{search_query}")
def search(search_query: str):
    #TODO: Implement search logic
    return {"search_query": search_query}

@app.post("/uploadfile/")
def search_pdf(file: UploadFile):
    #TODO: Implement search logic
    return {"filename": file.filename}




