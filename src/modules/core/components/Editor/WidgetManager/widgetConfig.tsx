export interface Root {
  name: string;
  displayName: string;
  description: string;
  component: string;
  defaultSize: {
    width: number;
    height: number;
  };
  properties: {
    text: string;
    loadingState: {
      type: string;
      displayName: string;
      validation: {
        type: string;
      };
    };
  };
  events: {
    onClick: {
      displayName: string;
    };
    onHover: {
      displayName: string;
    };
  };
  styles: {
    backgroundColor: {
      type: string;
      displayName: string;
      validation: {
        schema: {
          type: string;
        };
        defaultValue: boolean;
      };
    };
    textColor: {
      type: string;
      displayName: string;
      validation: {
        schema: {
          type: string;
        };
        defaultValue: boolean;
      };
    };
    loaderColor: {
      type: string;
      displayName: string;
      validation: {
        schema: {
          type: string;
        };
        defaultValue: boolean;
      };
    };
    visibility: {
      type: string;
      displayName: string;
      validation: {
        schema: {
          type: string;
        };
        defaultValue: boolean;
      };
    };
    disabledState: {
      type: string;
      displayName: string;
      validation: {
        schema: {
          type: string;
        };
        defaultValue: boolean;
      };
    };
    borderRadius: {
      type: string;
      displayName: string;
      validation: {
        schema: {
          type: string;
        };
        defaultValue: boolean;
      };
    };
    borderColor: {
      type: string;
      displayName: string;
      validation: {
        schema: {
          type: string;
        };
        defaultValue: boolean;
      };
    };
  };
  exposedVariables: {
    buttonText: string;
  };
  actions: {
    handle: string;
    displayName: string;
    params?: {
      handle: string;
      displayName: string;
      defaultValue: string;
      type?: string;
    }[];
  }[];
  definition: {
    properties: {
      text: {
        value: string;
      };
      loadingState: {
        value: string;
      };
    };
    events: any[];
    styles: {
      backgroundColor: {
        value: string;
      };
      textColor: {
        value: string;
      };
      loaderColor: {
        value: string;
      };
      visibility: {
        value: string;
      };
      borderRadius: {
        value: string;
      };
      borderColor: {
        value: string;
      };
      disabledState: {
        value: string;
      };
    };
  };
}

export const widgets = [
  {
    name: 'Button',
    displayName: 'Button',
    description: 'Trigger actions: queries, alerts, set variables etc.',
    component: 'Button',
    defaultSize: {
      width: 5,
      height: 3
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      text: {
        type: 'code',
        displayName: 'Button text',
        validation: {
          schema: { type: 'string' }
        }
      },
      loadingState: {
        type: 'toggle',
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    events: {
      onClick: { displayName: 'On click' },
      onHover: { displayName: 'On hover' }
    },
    styles: {
      backgroundColor: {
        type: 'color',
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false
        }
      },
      textColor: {
        type: 'color',
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false
        }
      },
      loaderColor: {
        type: 'color',
        displayName: 'Loader color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false
        }
      },
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false
        }
      },
      borderRadius: {
        type: 'number',
        displayName: 'Border radius',
        validation: {
          schema: { type: 'number' },
          defaultValue: false
        }
      },
      borderColor: {
        type: 'color',
        displayName: 'Border color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false
        }
      }
    },
    exposedVariables: {
      buttonText: 'Button'
    },
    actions: [
      {
        handle: 'click',
        displayName: 'Click'
      },
      {
        handle: 'setText',
        displayName: 'Set Text',
        params: [{ handle: 'text', displayName: 'Text', defaultValue: 'New Text' }]
      },
      {
        handle: 'disable',
        displayName: 'Disable',
        params: [
          { handle: 'disable', displayName: 'Value', defaultValue: `{{false}}`, type: 'toggle' }
        ]
      },
      {
        handle: 'visibility',
        displayName: 'Visibility',
        params: [
          { handle: 'visible', displayName: 'Value', defaultValue: `{{false}}`, type: 'toggle' }
        ]
      },
      {
        handle: 'loading',
        displayName: 'Loading',
        params: [
          { handle: 'loading', displayName: 'Value', defaultValue: `{{false}}`, type: 'toggle' }
        ]
      }
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        text: { value: `Button` },
        loadingState: { value: `{{false}}` }
      },
      events: [],
      styles: {
        backgroundColor: { value: '#375FCF' },
        textColor: { value: '#fff' },
        loaderColor: { value: '#fff' },
        visibility: { value: '{{true}}' },
        borderRadius: { value: '{{4}}' },
        borderColor: { value: '#375FCF' },
        disabledState: { value: '{{false}}' }
      }
    }
  },
  {
    name: 'TextInput',
    displayName: 'Text Input',
    description: 'User text input field',
    component: 'TextInput',
    defaultSize: {
      width: 8,
      height: 3
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      value: {
        type: 'code',
        displayName: 'Default value',
        validation: {
          schema: {
            type: 'string'
          }
        }
      },
      placeholder: {
        type: 'code',
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' }
        }
      }
    },
    validation: {
      regex: { type: 'code', displayName: 'Regex' },
      minLength: { type: 'code', displayName: 'Min length' },
      maxLength: { type: 'code', displayName: 'Max length' },
      customRule: { type: 'code', displayName: 'Custom validation' }
    },
    events: {
      onChange: { displayName: 'On change' },
      onEnterPressed: { displayName: 'On Enter Pressed' },
      onFocus: { displayName: 'On focus' },
      onBlur: { displayName: 'On blur' }
    },
    styles: {
      textColor: {
        type: 'color',
        displayName: 'Text color',
        validation: { schema: { type: 'string' } }
      },
      backgroundColor: {
        type: 'color',
        displayName: 'Background color',
        validation: { schema: { type: 'string' } }
      },
      borderColor: {
        type: 'color',
        displayName: 'Border color',
        validation: { schema: { type: 'string' } }
      },
      errTextColor: {
        type: 'color',
        displayName: 'Error text color',
        validation: { schema: { type: 'string' } }
      },
      borderRadius: {
        type: 'code',
        displayName: 'Border radius',
        validation: { schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } }
      },
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: { schema: { type: 'boolean' } }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: { schema: { type: 'boolean' } }
      }
    },
    exposedVariables: {
      value: ''
    },
    actions: [
      {
        handle: 'setText',
        displayName: 'Set text',
        params: [{ handle: 'text', displayName: 'text', defaultValue: 'New Text' }]
      },
      {
        handle: 'clear',
        displayName: 'Clear'
      },
      {
        handle: 'setFocus',
        displayName: 'Set focus'
      },
      {
        handle: 'setBlur',
        displayName: 'Set blur'
      },
      {
        handle: 'disable',
        displayName: 'Disable',
        params: [
          { handle: 'disable', displayName: 'Value', defaultValue: '{{false}}', type: 'toggle' }
        ]
      },
      {
        handle: 'visibility',
        displayName: 'Visibility',
        params: [
          { handle: 'visibility', displayName: 'Value', defaultValue: '{{false}}', type: 'toggle' }
        ]
      }
    ],
    definition: {
      validation: {
        regex: { value: '' },
        minLength: { value: null },
        maxLength: { value: null },
        customRule: { value: null }
      },
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        value: { value: '' },
        placeholder: { value: 'Enter your input' }
      },
      events: [],
      styles: {
        textColor: { value: '#000' },
        borderColor: { value: '#dadcde' },
        errTextColor: { value: '#ff0000' },
        borderRadius: { value: '{{4}}' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        backgroundColor: { value: '#fff' }
      }
    }
  },
  {
    name: 'NumberInput',
    displayName: 'Number Input',
    description: 'Numeric input field',
    component: 'NumberInput',
    defaultSize: {
      width: 4,
      height: 3
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      value: {
        type: 'code',
        displayName: 'Default value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] }
        }
      },
      minValue: {
        type: 'code',
        displayName: 'Minimum value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] }
        }
      },
      maxValue: {
        type: 'code',
        displayName: 'Maximum value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] }
        }
      },
      placeholder: {
        type: 'code',
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' }
        }
      },
      loadingState: {
        type: 'toggle',
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      decimalPlaces: {
        type: 'code',
        displayName: 'Decimal places',
        validation: {
          schema: { type: 'number' }
        }
      }
    },
    events: {
      onChange: { displayName: 'On change' }
    },
    styles: {
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      borderRadius: {
        type: 'code',
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] }
        }
      },
      backgroundColor: {
        type: 'color',
        displayName: 'Background color'
      },
      borderColor: {
        type: 'color',
        displayName: 'Border color',
        validation: {
          schema: { type: 'string' }
        }
      },
      textColor: {
        type: 'color',
        displayName: 'Text Color',
        validation: { schema: { type: 'string' } }
      }
    },
    exposedVariables: {
      value: 99
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        value: { value: '99' },
        maxValue: { value: '' },
        minValue: { value: '' },
        placeholder: { value: '0' },
        decimalPlaces: { value: '{{2}}' },
        loadingState: { value: '{{false}}' }
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{4}}' },
        backgroundColor: { value: '#ffffffff' },
        borderColor: { value: '#fff' },
        textColor: { value: '#232e3c' }
      }
    }
  },
  {
    name: 'PasswordInput',
    displayName: 'Password Input',
    description: 'Secure text input',
    component: 'PasswordInput',
    defaultSize: {
      width: 8,
      height: 3
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      placeholder: {
        type: 'code',
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' }
        }
      }
    },
    validation: {
      regex: { type: 'code', displayName: 'Regex' },
      minLength: { type: 'code', displayName: 'Min length' },
      maxLength: { type: 'code', displayName: 'Max length' },
      customRule: { type: 'code', displayName: 'Custom validation' }
    },
    events: {
      onChange: { displayName: 'On change' }
    },
    styles: {
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      borderRadius: {
        type: 'code',
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] }
        }
      },
      backgroundColor: {
        type: 'color',
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' }
        }
      }
    },
    exposedVariables: {
      value: ''
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        placeholder: { value: 'password' }
      },
      validation: {
        regex: { value: '' },
        minLength: { value: null },
        maxLength: { value: null },
        customRule: { value: null }
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{4}}' },
        backgroundColor: { value: '#ffffff' }
      }
    }
  },
  {
    name: 'Checkbox',
    displayName: 'Checkbox',
    description: 'Single checkbox toggle',
    component: 'Checkbox',
    defaultSize: {
      width: 1,
      height: 2
    },
    actions: [
      {
        handle: 'setChecked',
        displayName: 'Set checked',
        params: [{ handle: 'status', displayName: 'status' }]
      }
    ],
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      label: {
        type: 'code',
        displayName: 'Label',
        validation: {
          schema: { type: 'string' }
        }
      },
      defaultValue: {
        type: 'toggle',
        displayName: 'Default Status',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    events: {
      onCheck: { displayName: 'On check' },
      onUnCheck: { displayName: 'On uncheck' }
    },
    styles: {
      textColor: {
        type: 'color',
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' }
        }
      },
      checkboxColor: {
        type: 'color',
        displayName: 'Checkbox Color',
        validation: {
          schema: { type: 'string' }
        }
      },
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    exposedVariables: {
      value: false
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        label: { value: 'Checkbox label' },
        defaultValue: { value: '{{false}}' }
      },
      events: [],
      styles: {
        textColor: { value: '' },
        checkboxColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' }
      }
    }
  },
  {
    name: 'Radio-button',
    displayName: 'Radio Button',
    description: 'Select one from multiple choices',
    component: 'RadioButton',
    defaultSize: {
      width: 3,
      height: 2
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      label: {
        type: 'code',
        displayName: 'Label',
        validation: {
          schema: { type: 'string' }
        }
      },
      value: {
        type: 'code',
        displayName: 'Default value',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }]
          }
        }
      },
      values: {
        type: 'code',
        displayName: 'Option values',
        validation: {
          schema: {
            type: 'array',
            element: {
              type: 'union',
              schemas: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }]
            }
          }
        }
      },
      display_values: {
        type: 'code',
        displayName: 'Option labels',
        validation: {
          schema: {
            type: 'array',
            element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] }
          }
        }
      }
    },
    events: {
      onSelectionChange: { displayName: 'On select' }
    },
    styles: {
      textColor: {
        type: 'color',
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' }
        }
      },
      activeColor: {
        type: 'color',
        displayName: 'Active color',
        validation: {
          schema: { type: 'string' }
        }
      },
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    actions: [
      {
        handle: 'selectOption',
        displayName: 'Select Option',
        params: [
          {
            handle: 'option',
            displayName: 'Option'
          }
        ]
      }
    ],
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        label: { value: 'Select' },
        value: { value: '{{true}}' },
        values: { value: '{{[true,false]}}' },
        display_values: { value: '{{["yes", "no"]}}' },
        visible: { value: '{{true}}' }
      },
      events: [],
      styles: {
        textColor: { value: '' },
        activeColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' }
      }
    }
  },
  {
    name: 'ToggleSwitch',
    displayName: 'Toggle Switch',
    description: 'User-controlled on-off switch',
    component: 'ToggleSwitch',
    defaultSize: {
      width: 2,
      height: 2
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      label: {
        type: 'code',
        displayName: 'Label',
        validation: {
          schema: { type: 'string' }
        }
      },
      defaultValue: {
        type: 'toggle',
        displayName: 'Default Status',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    events: {
      onChange: { displayName: 'On change' }
    },
    styles: {
      textColor: {
        type: 'color',
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' }
        }
      },
      toggleSwitchColor: {
        type: 'color',
        displayName: 'Toggle Switch Color',
        validation: {
          schema: { type: 'string' }
        }
      },
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    exposedVariables: {
      value: false
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        label: { value: 'Toggle label' },
        defaultValue: { value: '{{false}}' }
      },
      events: [],
      styles: {
        textColor: { value: '' },
        toggleSwitchColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' }
      }
    }
  },
  {
    name: 'Textarea',
    displayName: 'Text Area',
    description: 'Multi-line text input',
    component: 'TextArea',
    defaultSize: {
      width: 8,
      height: 7
    },
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      value: {
        type: 'code',
        displayName: 'Default value',
        validation: {
          schema: { type: 'string' }
        }
      },
      placeholder: {
        type: 'code',
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' }
        }
      }
    },
    events: {},
    styles: {
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      borderRadius: {
        type: 'code',
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] }
        }
      }
    },
    exposedVariables: {
      value:
        'ToolJet is an open-source low-code platform for building and deploying internal tools with minimal engineering efforts 🚀'
    },
    actions: [
      {
        handle: 'setText',
        displayName: 'Set Text',
        params: [{ handle: 'text', displayName: 'text', defaultValue: 'New Text' }]
      },
      {
        handle: 'clear',
        displayName: 'Clear'
      }
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        value: {
          value:
            'ToolJet is an open-source low-code platform for building and deploying internal tools with minimal engineering efforts 🚀'
        },
        placeholder: { value: 'Placeholder text' }
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{4}}' }
      }
    }
  },
  {
    name: 'Text',
    displayName: 'Text',
    description: 'Display text or HTML',
    component: 'Text',
    others: {
      showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
      showOnMobile: { type: 'toggle', displayName: 'Show on mobile' }
    },
    properties: {
      text: {
        type: 'code',
        displayName: 'Text',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] }
        }
      },
      loadingState: {
        type: 'toggle',
        displayName: 'Show loading state',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    defaultSize: {
      width: 3,
      height: 2
    },
    events: [],
    styles: {
      fontWeight: {
        type: 'select',
        displayName: 'Font weight',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'bold', value: 'bold' },
          { name: 'lighter', value: 'lighter' },
          { name: 'bolder', value: 'bolder' }
        ]
      },
      decoration: {
        type: 'select',
        displayName: 'Text decoration',
        options: [
          { name: 'none', value: 'none' },
          { name: 'overline', value: 'overline' },
          { name: 'line-through', value: 'line-through' },
          { name: 'underline', value: 'underline' },
          { name: 'overline underline', value: 'overline underline' }
        ]
      },
      transformation: {
        type: 'select',
        displayName: 'Text transformation',
        options: [
          { name: 'none', value: 'none' },
          { name: 'uppercase', value: 'uppercase' },
          { name: 'lowercase', value: 'lowercase' },
          { name: 'capitalize', value: 'capitalize' }
        ]
      },
      fontStyle: {
        type: 'select',
        displayName: 'Font style',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'italic', value: 'italic' },
          { name: 'oblique', value: 'oblique' }
        ]
      },
      lineHeight: { type: 'number', displayName: 'Line height' },
      textIndent: { type: 'number', displayName: 'Text indent' },
      letterSpacing: { type: 'number', displayName: 'Letter spacing' },
      wordSpacing: { type: 'number', displayName: 'Word spacing' },
      fontVariant: {
        type: 'select',
        displayName: 'Font variant',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'small-caps', value: 'small-caps' },
          { name: 'initial', value: 'initial' },
          { name: 'inherit', value: 'inherit' }
        ]
      },
      textSize: {
        type: 'number',
        displayName: 'Text size',
        validation: {
          schema: { type: 'number' }
        }
      },
      backgroundColor: {
        type: 'color',
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' }
        }
      },
      textColor: {
        type: 'color',
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' }
        }
      },
      textAlign: {
        type: 'alignButtons',
        displayName: 'Align text',
        validation: {
          schema: { type: 'string' }
        }
      },
      visibility: {
        type: 'toggle',
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' }
        }
      },
      disabledState: {
        type: 'toggle',
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' }
        }
      }
    },
    exposedVariables: {
      text: 'Hello, there!'
    },
    actions: [
      {
        handle: 'setText',
        displayName: 'Set Text',
        params: [{ handle: 'text', displayName: 'Text', defaultValue: 'New text' }]
      },
      {
        handle: 'visibility',
        displayName: 'Set Visibility',
        params: [
          { handle: 'visibility', displayName: 'Value', defaultValue: `{{false}}`, type: 'toggle' }
        ]
      }
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' }
      },
      properties: {
        text: { value: 'Hello, there!' },
        loadingState: { value: `{{false}}` }
      },
      events: [],
      styles: {
        backgroundColor: { value: '#fff00000' },
        textColor: { value: '#000000' },
        textSize: { value: 14 },
        textAlign: { value: 'left' },
        fontWeight: { value: 'normal' },
        decoration: { value: 'none' },
        transformation: { value: 'none' },
        fontStyle: { value: 'normal' },
        lineHeight: { value: 1.5 },
        textIndent: { value: 0 },
        letterSpacing: { value: 0 },
        wordSpacing: { value: 0 },
        fontVariant: { value: 'normal' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' }
      }
    }
  }
];
