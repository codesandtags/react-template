import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from '../api';

import RequestAPI from '../';

describe('RequestAPI', () => {
  let wrapper;
  const axiosMock = new MockAdapter(axios);
  const wait = time => new Promise(resolve => setTimeout(resolve, time));
  const props = {
    children: null
  };

  afterEach(() => {});

  test('should match the snapshot', () => {
    wrapper = shallow(<RequestAPI  {...props}/>);
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('When clicks the GET button', () => {
    test('should set the users from the response', async () => {
      const spy = jest.spyOn(RequestAPI.prototype, 'handleGet');
      const mockDataGet = [
        { id: 1, name: 'John Smith' },
        { id: 2, name: 'Edwin Torres' },
      ];
      axiosMock.onGet('users').reply(200, mockDataGet);

      wrapper = shallow(<RequestAPI  {...props}/>);
      wrapper.find('.RequestAPI__button-get').simulate('click');
      await wait(0);

      expect(spy).toHaveBeenCalled();
      expect(wrapper.state().users).toEqual(mockDataGet);
    });
  });

  describe('When clicks the POST button', () => {
    test('should set the users from the response', async () => {
      const spy = jest.spyOn(RequestAPI.prototype, 'handlePost');
      const mockDataPost = {
        id: 1,
        name: 'John Smith',
      };
      axiosMock.onPost('/users').reply(200, mockDataPost);

      wrapper = shallow(<RequestAPI  {...props}/>);
      wrapper.find('.RequestAPI__button-post').simulate('click');
      await wait(0);

      expect(spy).toHaveBeenCalled();
      expect(wrapper.state().users).toEqual([mockDataPost]);
    });
  });

  describe('When clicks the PUT button', () => {
    test('should set the users from the response', async () => {
      const spy = jest.spyOn(RequestAPI.prototype, 'handlePut');
      const mockDataPut = {
        id: 1,
        name: 'John Smith',
      };
      axiosMock.onPut('/users/1').reply(200, mockDataPut);

      wrapper = shallow(<RequestAPI  {...props}/>);
      wrapper.find('.RequestAPI__button-put').simulate('click');
      await wait(0);

      expect(spy).toHaveBeenCalled();
      expect(wrapper.state().users).toEqual([mockDataPut]);
    });
  });

  describe('When clicks the DELETE button', () => {
    test('should set the users from the response', async () => {
      const spy = jest.spyOn(RequestAPI.prototype, 'handleDelete');
      const mockDataDelete = {};
      axiosMock.onDelete('/users/1').reply(200, mockDataDelete);

      wrapper = shallow(<RequestAPI  {...props}/>);
      wrapper.find('.RequestAPI__button-delete').simulate('click');
      await wait(0);

      expect(spy).toHaveBeenCalled();
      expect(wrapper.state().users).toEqual([]);
    });
  });

  describe('When types something the TextField', () => {
    test('should set the value for the user name', () => {
      const spy = jest.spyOn(RequestAPI.prototype, 'handleFieldChange');
      const userExpected = {
        name: 'Hello',
      };

      wrapper = shallow(<RequestAPI  {...props}/>);
      wrapper.find('#text-field-1').simulate('change', { target: { value: 'Hello' } });

      expect(spy).toHaveBeenCalled();
      expect(wrapper.state('user')).toMatchObject(userExpected);
    });
  });
});
