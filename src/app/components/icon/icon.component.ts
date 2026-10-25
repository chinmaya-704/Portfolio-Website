import { Component, input, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { SvgService } from '../../services/svg.service';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'inline-flex items-center justify-center shrink-0 leading-none select-none',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
    '[class]': 'className()',
    'aria-hidden': 'true'
  }
})
export class IconComponent {
  private readonly svgService = inject(SvgService);

  readonly name = input.required<string>();
  readonly size = input<number>(20);
  readonly className = input<string>('');
  readonly strokeWidth = input<number>(2);

  readonly svgContent = computed(() => this.svgService.getSvg(this.name()));
}
