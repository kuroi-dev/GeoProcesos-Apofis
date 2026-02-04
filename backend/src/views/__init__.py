from typing import Any, Dict


def item_to_dict(item: Any) -> Dict:
    # convert model/item to serializable dict
    try:
        return {'id': item.id, 'name': item.name}
    except Exception:
        return dict(item)


def items_to_list(items) -> list:
    return [item_to_dict(i) for i in items]
