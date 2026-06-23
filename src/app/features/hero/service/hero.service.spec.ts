import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load heroes from the public endpoint', () => {
    service.loadHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0].name).toBe('Batman');
    });

    const req = httpMock.expectOne('https://akabab.github.io/superhero-api/api/all.json');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 70, name: 'Batman', images: { md: 'https://example.com/batman.jpg' } }]);
  });
});
