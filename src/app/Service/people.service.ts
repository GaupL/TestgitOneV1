import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { peopleServiceDTO } from '../../people.modes';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private url : string ="https://localhost:7022/api/Employee";

  constructor(private http:HttpClient) { }

   public create(person:peopleServiceDTO){
    const formData= this.builderFormdData(person);
    return this.http.post(this.url,formData);
  }

  private builderFormdData(person:peopleServiceDTO):FormData{
    const formData = new FormData();
    formData.append('name',person.name);
    formData.append('picture',person.picture);
    return formData;
  }

}
