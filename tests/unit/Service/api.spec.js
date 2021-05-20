import {getAllShows,searchShows} from '@/Service/api'
import axios from 'axios'

jest.mock('axios');

describe('In TV Show Service',()=>{
  it('Mocking getShowsByName method ', () => {
    const showMockData = ["Breaking Bad", "The Wire"];
    axios.get.mockResolvedValue(showMockData);
    getAllShows('Breaking').then( response => {
        expect(response).toEqual(showMockData);
    })
})
it('Mocking getShowsByName method ', () => {
    const showMockData = ["Breaking Bad", "The Wire"];
    axios.get.mockResolvedValue(showMockData);
    searchShows('Breaking').then( response => {
        expect(response).toEqual(showMockData);
    })
})

});
