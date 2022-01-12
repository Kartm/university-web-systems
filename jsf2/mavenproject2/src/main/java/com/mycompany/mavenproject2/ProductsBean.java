package com.mycompany.mavenproject2;

import javax.faces.bean.SessionScoped;
import javax.faces.bean.ManagedBean;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;

@ManagedBean(name="products")
@SessionScoped
public class ProductsBean implements Serializable {
    private List<Product> items1 = new ArrayList<Product>();
    private List<Product> items2 = new ArrayList<Product>();
    private List<Product> items3 = new ArrayList<Product>();
    private String categories = "";
    
    public ProductsBean() {
       this.items1.add(new Product("Butter", 3));
       this.items1.add(new Product("Milk", 2));
       this.items1.add(new Product("Cheese", 3));
       this.items2.add(new Product("Bread", 2));
       this.items2.add(new Product("Bun", 1));
       this.items2.add(new Product("Pie", 6));
       this.items3.add(new Product("Water", 1));
       this.items3.add(new Product("Tea", 3));
       this.items3.add(new Product("Coffee", 4));
   }
    
    public String getCategories() {
        return categories;
    }
    
    public void setCategories(String num) {
        this.categories = num;
    }

    public List<Product> getItems() {
        switch (this.categories) {
               case "1": return items1;
               case "2": return items2;
               case "3": return items3;
               default: return null;
       }
    }

   public void setItems(ArrayList<Product> items) {
       switch (this.categories) {
               case "1": 
                   this.items1 = items;
                   break;
               case "2": 
                   this.items2 = items;
                   break;
               case "3": 
                   this.items3 = items;
                   break;
               default: return;
       }
   }
}