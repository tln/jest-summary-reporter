it('fails', () => {
  expect(1).toEqual(2);
});
it('passes', () => {
  expect(2).toEqual(2);
});
describe('nested', () => {
  it('nested pass', () => {
    expect(2).toEqual(2);
  });
  it.skip('skipped test', () => {

  });
  describe('deeply nested', () => {
    it('passes', () => {
      expect(2).toEqual(2);
    });
    it('fails', () => {
      expect(2).toEqual(1);
    });
  });
});

