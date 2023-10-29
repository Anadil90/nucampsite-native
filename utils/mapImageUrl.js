import { baseUrl } from '../shared/baseUrl';

export const mapImageUrl = (array) => {
    return array.map((item) => { //return the array parameter as a mapped through array containing each item
        return { //return an object with the spread out item array and append the base url to the existing value
            ...item,
            image: baseUrl + item.image
        }
    })
}