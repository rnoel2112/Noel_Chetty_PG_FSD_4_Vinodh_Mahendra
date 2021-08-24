import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodItem } from '../food-item';
import { FoodItemService } from '../food-item.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {
  foodFormData= new FoodItem();
  fooditems : FoodItem[];

  constructor(private foodItemService: FoodItemService) { }

  ngOnInit(): void {
    this.foodItemService.readFoodItem().subscribe ((item)=>{
      this.fooditems = item.map((doc)=>{
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data() as {}
        } as FoodItem
      })
      console.log("Item Received:" + item);
    })
  }

  saveData(){
    console.log("Saving data: " + this.foodFormData);
    console.log( this.foodFormData.title);
    console.log( this.foodFormData.price);
    console.log( this.foodFormData.imageUrl);
    if (this.foodFormData.id==null){
      this.foodItemService.saveFoodItem(this.foodFormData)
    }
    else {
      console.log ("In Save for Update")
      console.log("Id:"+this.foodFormData.id);
      console.log("Price:"+this.foodFormData.price);
      this.foodItemService.updateFoodItem(this.foodFormData)
    }

    this.foodFormData= new FoodItem();
    //foodForm.resetForm()

  }

  editData(afoodItem:FoodItem){
    this.foodFormData= afoodItem;
  }

  deleteData(afoodItem:FoodItem){
    this.foodItemService.deleteFoodItems(afoodItem);
  }

  clear(){
    this.foodFormData= new FoodItem();
  }
}
