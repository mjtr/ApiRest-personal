describe('Add stats', function() {
    it('should add a new stats', function() {
      browser.get('https://sos1718-12.herokuapp.com/#!/api/v2/rape-stats')

        element.all(by.repeater("data in database")).then(function(initialData) {
            //browser.driver.sleep(2000);

            element(by.model('newData.country')).sendKeys('ffffas');
            element(by.model('newData.year')).sendKeys(9999);
            element(by.model("newData['number-of-rape']")).sendKeys(123312);
            element(by.model('newData.rate')).sendKeys(12);
            element(by.model("newData['total-since-two-thousand']")).sendKeys(678789);

            element(by.buttonText('Add')).click().then(function() {

                element.all(by.repeater("data in database")).then(function(datas) {
                    expect(datas.length).toEqual(initialData.length + 1);
                });

            });

        });
    });

});
