import { shallow } from "enzyme";
import React from "react";
import HOCComponent from "../component/HOCComponent";

let wrapper;

beforeEach(() => {
    wrapper = shallow(<HOCComponent />);
});

describe("renders with a name", () => {

    //expect(wrapper.sum("1", 2)).toBe(3);

    it('this is for text', () => {
        expect(wrapper.find(".text").text()).toEqual("Hello Text");
    });

    it('email field', () => {
        expect(wrapper.find('.userName')).toHaveLength(1);
    });

    it('this is for submit button', () => {
        expect(wrapper.find('#submitBtn')).toHaveLength(1);
    });

    describe('When onChange event is not triggered on userName field', () => {
        it('should have empty state', () => {
            expect(wrapper.state().userName).toEqual('');
        });
    });

    describe('submit button is clicked', () => {
        beforeEach(() => {
            wrapper.find('.userName').simulate('change', { target: { value: 'test@hcl.com' } });

            const fakeEvent = { preventDefault: () => console.log('preventDefault') };
            const submit = wrapper.find('button');
            submit.simulate('click', fakeEvent);
        });

        it('should have excepted userName', () => {
            expect(wrapper.state().userName).toEqual('test@hcl.com');
        });

    });
});

