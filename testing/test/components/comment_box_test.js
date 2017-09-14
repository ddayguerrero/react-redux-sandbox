import { renderComponent , expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';

describe('CommentBox', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(CommentBox); // jquery wrapped object
  });

  it('has the correct class', () =>{
    expect(component).to.have.class('comment-box');
  });

  it('has a text area', () => {
    expect(component.find('textarea')).to.exist;
  });

  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });

  describe('entering some text', () => {
    beforeEach(()=>{
      component.find('textarea').simulate('change', 'new comment 123');
    });

    it('shows text in the textarea', () => {
      expect(component.find('textarea')).to.have.value('new comment 123');
    });

    it('clears input when submitted', () => {
      component.simulate('submit');
      expect(component.find('textarea')).to.have.value('');
    });
  });
});