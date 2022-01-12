package com.mycompany.mavenproject2;

public class Product {
    String name;
    int value;

    public Product(String name, int value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return this.name;
    }

    public int getValue() {
        return this.value;
    }
}

