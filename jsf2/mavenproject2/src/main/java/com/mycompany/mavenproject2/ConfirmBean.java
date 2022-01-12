package com.mycompany.mavenproject2;

import java.io.Serializable;
import javax.faces.bean.SessionScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean(name="confirmBean")
@SessionScoped
public class ConfirmBean implements Serializable
{
    int test = 0;
}
