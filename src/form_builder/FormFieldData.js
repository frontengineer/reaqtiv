import ID from './UUID';
import assign from '../utils/assign';
export const elementList = [
      // {
      //   key: 'Camera',
      //   title: 'Camera',
      //   icon: 'fa fa-camera',
      //   label: 'Placeholder Label',
      //   field_name: 'camera_'
      // },

      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        title: 'Checkboxes',
        icon: 'fa fa-check-square-o',
        label: 'Placeholder Label',
        field_name: 'checkboxes_',
        options: []
      },
      {
        key: 'DatePicker',
        title: 'Date',
        icon: 'fa fa-calendar',
        label: 'Placeholder Label',
        field_name: 'date_picker_'
      },
      {
        key: 'Dropdown',
        canHaveAnswer: true,
        title: 'Dropdown',
        icon: 'fa fa-caret-square-o-down',
        label: 'Placeholder Label',
        field_name: 'dropdown_',
        options: []
      },
      {
        key: 'Download',
        title: 'Downloadable',
        icon: 'fa fa-file',
        static: true,
        content: 'Placeholder file title ...',
        field_name: 'download_',
        file_path: '',
        _href: ''
      },
      {
        key: 'Tags',
        canHaveAnswer: true,
        title: 'Tags',
        icon: 'fa fa-tags',
        label: 'Placeholder Label',
        field_name: 'tags_',
        options: []
      },
      {
        key: 'Header',
        title: 'Heading',
        icon: 'fa fa-header',
        static: true,
        content: 'Placeholder Text...'
      },
      {
        key: 'LineBreak',
        title: 'Line Break',
        static: true,
        icon: 'fa fa-arrows-h'
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        title: 'Multiple Choice',
        icon: 'fa fa-dot-circle-o',
        label: 'Placeholder Label',
        field_name: 'radio_buttons_',
        options: []
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        title: 'Multi-line Input',
        label: 'Placeholder Label',
        icon: 'fa fa-text-height',
        field_name: 'text_area_'
      },
      {
        key: 'Paragraph',
        title: 'Paragraph',
        static: true,
        icon: 'fa fa-paragraph',
        content: 'Placeholder Text...'
      },
      // {
      //   key: 'Rating',
      //   canHaveAnswer: true,
      //   title: 'Rating',
      //   label: 'Placeholder Label',
      //   icon: 'fa fa-star',
      //   field_name: 'rating_'
      // },
      {
        key: 'Signature',
        title: 'Signature',
        icon: 'fa fa-pencil-square-o',
        label: 'Signature',
        field_name: 'signature_'
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        title: 'Text Input',
        label: 'Placeholder Label',
        icon: 'fa fa-font',
        field_name: 'text_input_'
      },
      {
        key: 'HyperLink',
        title: 'Web site',
        icon: 'fa fa-link',
        static: true,
        content: 'Placeholder Web site link ...',
        href: 'http://www.example.com'
      }
      // {
      //   key: 'Range',
      //   title: 'Range',
      //   icon: 'fa fa-sliders',
      //   label: 'Placeholder Label',
      //   field_name: 'range_',
      //   step: 1,
      //   default_value: 3,
      //   min_value: 1,
      //   max_value: 5,
      //   min_label: 'Easy',
      //   max_label: 'Difficult'
      // },
    ];
export const _defaultItemOptions = {
      Dropdown: [
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()},
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()},
          {value: '', text: '', key: 'dropdown_option_' + ID.uuid()}
      ],
      Tags: [
          {value: 'place_holder_tag_1', text: 'Place holder tag 1', key: 'tags_option_' + ID.uuid()},
          {value: 'place_holder_tag_2', text: 'Place holder tag 2', key: 'tags_option_' + ID.uuid()},
          {value: 'place_holder_tag_3', text: 'Place holder tag 3', key: 'tags_option_' + ID.uuid()}
      ],
      Checkboxes: [
          {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'checkboxes_option_' + ID.uuid()},
          {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'checkboxes_option_' + ID.uuid()},
          {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'checkboxes_option_' + ID.uuid()}
      ],
      RadioButtons: [
          {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'radiobuttons_option_' + ID.uuid()},
          {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'radiobuttons_option_' + ID.uuid()},
          {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'radiobuttons_option_' + ID.uuid()}
      ]
};

function elementWithOptions(coll1, coll2){
  return coll1.map(x => {
    return (x.options) ? assign({}, x, {options : coll2[x.key]}) : x;
  });
}

function filterOnKeyByVal(coll, key, val){
	return function(key){
  	return function(val){
  		return coll.filter(function(x){
    		return x[key] === val;
    	});
    }
  }
}
const filterBy = filterOnKeyByVal(elementWithOptions(elementList, _defaultItemOptions));

// console.log('FormFieldData:filterBy: ','key');
export default {
  filterBy :  filterBy,
  getElements : () => elementList
};
