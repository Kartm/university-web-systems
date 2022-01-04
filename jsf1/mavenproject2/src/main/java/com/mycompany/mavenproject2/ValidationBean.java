package validation;

import java.io.Serializable;
import javax.faces.bean.ManagedBean;

@ManagedBean( name="validationBean" )
public class ValidationBean implements Serializable
{
   private String name;
   private String email;
   private String phone;
   private int age;
   private boolean isStudent;
   
   public String getName()
   {
      return name;
   }

   public void setName( String name )
   {
      this.name = name;
   }

   public String getEmail()
   {
      return email;
   }

   public void setEmail( String email )
   {
      this.email = email;
   }

   public String getPhone()
   {
      return phone;
   }

   public void setPhone( String phone )
   {
      this.phone = phone;
   }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean getIsStudent() {
        return this.isStudent;
    }

    public void setIsStudent(boolean isStudent) {
        this.isStudent = isStudent;
    }

   public String getResult()
   {
      if ( name != null && email != null && phone != null )
         return "<p style=\"background-color:grey;width:200px;" +
            "padding:10px\"> " + (getIsStudent() ? "STUDENT :)" : "NOT STUDENT :(") + 
            " <br/>Age: " + getAge() +
            " <br/>Name: " + getName() + "<br/>E-Mail: " +
            getEmail() + "<br/>Phone: " + getPhone() + "</p>";
      else
         return "";
   }
}
