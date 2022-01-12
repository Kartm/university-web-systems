package com.mycompany.mavenproject2;

import java.io.Serializable;
import javax.faces.bean.SessionScoped;
import javax.faces.bean.ManagedBean;
import java.util.Set;
import java.util.LinkedHashSet;
import java.util.ArrayList;
import java.io.Serializable;

@ManagedBean(name="cartBean")
@SessionScoped
public class CartBean implements Serializable
{
    Set<Product> cartItems = new LinkedHashSet<Product>();

    public boolean isInCart(Product product) {
        return this.cartItems.contains(product);
    }

    public Set<Product> getCartItems() {
        return this.cartItems;
    }

   public String getTotal()
   {
        int sum = 0;

        for(Product item : cartItems){
           sum += item.value;
        }

        return String.valueOf(sum);
   }

    public void addToCart(Product product) {
        this.cartItems.add(product);
        System.out.println(product);
    }
}
