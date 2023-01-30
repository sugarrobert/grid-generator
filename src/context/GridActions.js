import { nanoid } from 'nanoid';

export const createNewTemplateItem = () => {
    const id = nanoid();

    return {
        id: id,
        input: {
            id: nanoid(),
            dataId: id,
            value: '1',
        },
        options: {
            id: nanoid(),
            dataId: id,
            selected: 'fr',
            option: ['fr', 'px', '%', 'auto'],
        },
    };
};

export const createGridPreviewItem = (i) => {
    let itemNum = `grid__item--${i + 1}`;
    const item = {
        id: itemNum,
        class: `grid__item ${itemNum}`,
        columnStart: {
            id: `column__${itemNum}`,
            value: 1,
        },
        rowStart: {
            id: `row__${itemNum}`,
            value: 1,
        },
    };
    return item;
};

export const updateGridTemplate = (templateList) => {
    const newItem = createNewTemplateItem();
    templateList.push(newItem);

    return templateList;
};

export const deleteGridTemplate = (e, templateList) => {
    const btnId = e.target.dataset.id;

    const newList = templateList.filter((listItem) => {
        return listItem.id !== btnId;
    });

    return newList;
};

export const onValueChange = (e, templateList) => {
    const parent = e.target.parentElement.id;
    const elementName = e.target.nodeName;
    const { value } = e.target;

    const updateValue = templateList.map((listItem) => {
        if (elementName === 'INPUT') {
            if (parent === listItem.id) {
                listItem.input.value = value;
            }
        } else if (elementName === 'SELECT') {
            if (parent === listItem.id) {
                listItem.options.selected = value;
            }
        }

        return listItem;
    });

    return updateValue;
};

export const onGutterValueChange = (e, gridGutter) => {
    const elementName = e.target.nodeName;
    const { value } = e.target;

    if (elementName === 'INPUT') {
        const newInput = { ...gridGutter };
        newInput.input.value = value;
        return newInput;
    } else if (elementName === 'SELECT') {
        const newSelected = { ...gridGutter };
        newSelected.options.selected = value;
        return newSelected;
    }
};

export const onAlignmentValueChange = (e, gridAlignment) => {
    const { value } = e.target;

    const newSelected = { ...gridAlignment };
    newSelected.options.selected = value;
    return newSelected;
};

export const updateGridTemplateStyle = (
    templateList,
    updateStyle,
    gridListStyle
) => {
    const templateStyle = templateList.map((style) => {
        const input = style.input.value;
        const option = style.options.selected;
        let newValue;

        if (option !== 'auto') {
            newValue = input + option;
        } else {
            newValue = option;
        }

        return newValue;
    });

    const newValue = templateStyle.join(' ');

    const newStyle = { ...gridListStyle };
    newStyle[updateStyle] = newValue;
    return newStyle;
};

export const updateGridGuttersStyle = (
    templateGutter,
    updateStyle,
    gridListStyle
) => {
    const input = templateGutter.input.value;
    const option = templateGutter.options.selected;
    const newValue = input + option;

    const newStyle = { ...gridListStyle };
    newStyle[updateStyle] = newValue;
    return newStyle;
};

export const updateGridAlignment = (
    templateAlignment,
    updateStyle,
    gridListStyle
) => {
    const option = templateAlignment.options.selected;

    const newStyle = { ...gridListStyle };
    newStyle[updateStyle] = option;
    return newStyle;
};
