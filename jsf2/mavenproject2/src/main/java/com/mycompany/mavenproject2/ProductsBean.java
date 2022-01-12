package com.mycompany.mavenproject2;

import javax.faces.bean.SessionScoped;
import javax.faces.bean.ManagedBean;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;

@ManagedBean(name="products")
@SessionScoped
public class ProductsBean implements Serializable {
    private List<Product> items = new ArrayList<Product>();

    public ProductsBean() {
       this.add(new Product("Butter", 3));
       this.add(new Product("Bread", 2));
       this.add(new Product("Water", 1));
   }

    public List<Product> getItems() {
        return items;
    }

   public void setItems(ArrayList<Product> items) {
       this.items = items;
   }
}