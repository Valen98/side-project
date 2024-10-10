package com.booleanuk.reponses;

public class Response<T> {
    protected String status;
    protected T data;

    public void set(T data) {
        this.status = "success";
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public T getData() {
        return data;
    }

}

