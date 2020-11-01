package eci.ieti.data.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Todo {

    private String description;

    private int priority;

    private Date dueDate;

    private User responsible;

    private String status;

    private String fileUrl;

    public Todo() {
    }

    public Todo(String description, String status, String fileUrl) {
        this.description = description;
        this.status = status;
        this.fileUrl = fileUrl;
    }

    public Todo(String description, Date dueDate, User responsible, String status, String fileUrl) {
        this.description = description;
        this.dueDate = dueDate;
        this.responsible = responsible;
        this.status = status;
        this.fileUrl = fileUrl;
        this.priority = 5;
    }

    public Todo(String description, Date dueDate, User responsible) {
        this.description = description;
        this.priority = 5;
        this.dueDate = dueDate;
        this.responsible = responsible;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public User getResponsible() {
        return responsible;
    }

    public void setResponsible(User responsible) {
        this.responsible = responsible;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "description='" + description + '\'' +
                ", dueDate=" + dueDate +
                ", responsible=" + responsible +
                '}';
    }
}
