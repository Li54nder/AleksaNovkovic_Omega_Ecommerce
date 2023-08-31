import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isInFavorite'
})
export class IsInFavoritePipe implements PipeTransform {

  transform(value: number, trigger: number) {
    let favorites = localStorage.getItem('favorites');
    if (!favorites)
      return false;
    let favoritesArr = JSON.parse(favorites);
    return favoritesArr.find((p: {id: number}) => p.id === value);
  }

}
