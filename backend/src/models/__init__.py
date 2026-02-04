from dataclasses import dataclass
from typing import List


@dataclass
class Item:
    id: int
    name: str


def list_items() -> List[Item]:
    # placeholder: replace with DB access
    return [Item(id=1, name='example')]


def create_item(data: dict) -> Item:
    # placeholder: insert into DB and return created item
    return Item(id=2, name=data.get('name', 'unnamed'))
