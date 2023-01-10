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

export const updateGridTemplate = (setTemplateNum, setTemplateList) => {
    setTemplateNum((currentTemplateNum) => {
        return currentTemplateNum + 1;
    });

    const newItem = createNewTemplateItem();

    setTemplateList((prevList) => [...prevList, newItem]);
};

export const onValueChange = (e, templateList, setTemplateList) => {
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

    setTemplateList(updateValue);
};

export const onGutterValueChange = (e, setGridGutter) => {
    const elementName = e.target.nodeName;
    const { value } = e.target;

    if (elementName === 'INPUT') {
        setGridGutter((prevGutter) => {
            const newInput = { ...prevGutter };
            newInput.input.value = value;
            return newInput;
        });
    } else if (elementName === 'SELECT') {
        setGridGutter((prevGutter) => {
            const newSelected = { ...prevGutter };
            newSelected.options.selected = value;
            return newSelected;
        });
    }
};

export const updateGridTemplateStyle = (
    templateList,
    updateStyle,
    setNewStyle
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

    const newStyle = templateStyle.join(' ');

    setNewStyle((prevStyle) => ({
        ...prevStyle,
        [updateStyle]: newStyle,
    }));
};

export const updateGridAlignment = (
    templateAlignment,
    updateStyle,
    setNewStyle
) => {
    const option = templateAlignment.options.selected;

    setNewStyle((prevAlignment) => {
        const newAlignment = { ...prevAlignment };
        newAlignment[updateStyle] = option;
        return newAlignment;
    });
};

export const onAlignmentValueChange = (e, setGridAlignment) => {
    const { value } = e.target;

    setGridAlignment((prevAlignment) => {
        const newSelected = { ...prevAlignment };
        newSelected.options.selected = value;
        return newSelected;
    });
};

export const updateGridGuttersStyle = (
    templateGutter,
    updateStyle,
    setNewStyle
) => {
    const input = templateGutter.input.value;
    const option = templateGutter.options.selected;
    const newValue = input + option;

    setNewStyle((prevGutter) => {
        const newGutter = { ...prevGutter };
        newGutter[updateStyle] = newValue;
        return newGutter;
    });
};

export const deleteGridTemplate = (
    e,
    setTemplateNum,
    templateList,
    setTemplateList
) => {
    const btnId = e.target.dataset.id;

    setTemplateNum((currentTemplateNum) => {
        return currentTemplateNum - 1;
    });

    const newColumnList = templateList.filter((listItem) => {
        return listItem.id !== btnId;
    });

    setTemplateList(newColumnList);
};
