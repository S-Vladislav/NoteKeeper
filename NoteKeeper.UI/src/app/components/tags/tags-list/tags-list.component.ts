import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ITags } from '../../../models/tags.model';
import { TagsService } from '../../../services/tags/tags.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
})
export class TagsListComponent implements OnInit {
  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagsService.getAllTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
    });
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: ITags[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add tag
    if (value) {
      const newTag: ITags = { tagId: 0, tagName: value };
      this.tagsService.addTag(newTag).subscribe({
        next: (addedTag) => {
          this.tags.push(addedTag);
        },
        error: (err) => {
          console.error('Error adding tag', err);
        },
      });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // Delete Tag
  remove(tag: ITags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      const tagId = this.tags[index].tagId;
      this.tagsService.deleteTag(tagId).subscribe({
        next: () => {
          this.tags.splice(index, 1);
        },
        error: (err) => {
          console.error('Error deleting tag', err);
        },
      });
    }
  }
}
