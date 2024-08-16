const getRandomDelay = () => {
    const minDelay = 500;
    const maxDelay = 2000;
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
};

const lightRevisions = [
    {
        revisionId: '3',
        author: {
            id: 'tiny.husky',
            name: 'A Tiny Husky',
            avatar: '../_images/tiny-husky.jpg',
        },
        createdAt: '2023-11-25T08:30:21.578Z'
    },
    {
        revisionId: '2',
        author: {
            id: 'tiny.user',
            name: 'A Tiny User',
            avatar: '../_images/logos/android-chrome-192x192.png',
        },
        createdAt: '2023-11-24T22:26:21.578Z',
    },
    {
        revisionId: '1',
        author: {
            id: 'tiny.user',
            name: 'A Tiny User',
            avatar: '../_images/logos/android-chrome-192x192.png',
        },
        createdAt: '2023-11-23T20:26:21.578Z',
    },
];

const revisionhistory_fetch = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                lightRevisions
                    .sort((a, b) =>
                        new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1
                    )
                    .reverse()
            );
        }, getRandomDelay());
    });

const revisions = [
    {
        revisionId: '3',
        createdAt: '2023-11-24T22:26:21.578Z',
        author: {
            id: 'tiny.husky',
            name: 'A Tiny Husky',
            avatar: '../_images/tiny-husky.jpg',
        },
        content: `
  <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Tiny Logo" src="https://www.tiny.cloud/docs/images/logos/android-chrome-256x256.png" alt="TinyMCE Logo" width="128" height="128"></p>
  <h2 style="text-align: center;">Welcome to the TinyMCE editor demo!</h2>
  <h2>A simple table to play with</h2>
  <table style="border-collapse: collapse; width: 100%;" border="1">
  <thead>
  <tr>
  <th>Product</th>
  <th>Cost</th>
  <th>Really?</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>TinyMCE</td>
  <td>Free</td>
  <td>YES!</td>
  </tr>
  <tr>
  <td>Plupload</td>
  <td>Free</td>
  <td>YES!</td>
  </tr>
  </tbody>
  </table>
  <h2>Found a bug?</h2>
  <p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
  <h2>Finally ...</h2>
  <p><s>Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</s></p>
  <p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br>All the best from the TinyMCE team.</p>
`,
    },
    {
        revisionId: '2',
        createdAt: '2023-11-25T08:30:21.578Z',
        author: {
            id: 'tiny.user',
            name: 'A Tiny User',
            avatar: '../_images/logos/android-chrome-192x192.png',
        },
        content: `
  <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Tiny Logo" src="https://www.tiny.cloud/docs/images/logos/android-chrome-256x256.png" alt="TinyMCE Logo" width="128" height="128"></p>
  <h2 style="text-align: center;">Welcome to the TinyMCE editor demo!</h2>
  <h2>Got questions or need help?</span></h2>
  <ol>
  <li>Our <a href="../">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
  <li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>
  <li>We also offer enterprise grade support as part of <a href="../../../../pricing">TinyMCE premium plans</a>.</li>
  </ol>
  <h2>A simple table to play with</h2>
  <table style="border-collapse: collapse; width: 100%;" border="1">
  <thead>
  <tr>
  <th>Product</th>
  <th>Cost</th>
  <th>Really?</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>TinyMCE</td>
  <td>Free</td>
  <td>YES!</td>
  </tr>
  <tr>
  <td>Plupload</td>
  <td>Free</td>
  <td>YES!</td>
  </tr>
  </tbody>
  </table>
  <h2>Found a bug?</h2>
  <p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
  <h2>Finally ...</h2>
  <p>Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
  <p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br>All the best from the TinyMCE team.</p>
`,
    },
    {
        revisionId: '1',
        createdAt: '2023-11-29T10:11:21.578Z',
        author: {
            id: 'tiny.user',
            name: 'A Tiny User',
            avatar: '../_images/logos/android-chrome-192x192.png',
        },
        content: `
  <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Tiny Logo" src="https://www.tiny.cloud/docs/images/logos/android-chrome-256x256.png" alt="TinyMCE Logo" width="128" height="128"></p>
  <h2 style="text-align: center;">Welcome to the TinyMCE editor demo!</h2>
  <h2>Got questions or need help?</h2>
  <ul>
  <li>Our <a href="../">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
  <li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>
  <li>We also offer enterprise grade support as part of <a href="../../../../pricing">TinyMCE premium plans</a>.</li>
  </ul>
  <h2>A simple table to play with</h2>
  <table style="border-collapse: collapse; width: 100%;" border="1">
  <thead>
  <tr>
  <th>Product</th>
  <th>Cost</th>
  <th>Really?</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>TinyMCE</td>
  <td>Free</td>
  <td>YES!</td>
  </tr>
  <tr>
  <td>Plupload</td>
  <td>Free</td>
  <td>YES!</td>
  </tr>
  </tbody>
  </table>
  <h2>Found a bug?</h2>
  <p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
  <h2>Finally ...</h2>
  <p>Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
  <p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br>All the best from the TinyMCE team.</p>
`,
    }
];

const revisionhistory_fetch_revision = (_editor, revision) =>
    new Promise((resolve) => {
        setTimeout(() => {
            let newRevision = null;
            for (let i = 0; i < revisions.length; i++) {
                const temp = revisions[i];
                if (temp.revisionId === revision.revisionId) {
                    newRevision = temp;
                    break;
                }
            }
            resolve(newRevision);
        }, getRandomDelay());
    });
const advtemplate_templates = [
    {
        title: 'Quick replies',
        items: [
            {
                title: 'Message received',
                content: '<p dir="ltr">Hey {{Customer.FirstName}}!</p>\n<p dir="ltr">Just a quick note to say we&rsquo;ve received your message, and will get back to you within 48 hours.</p>\n<p dir="ltr">For reference, your ticket number is: {{Ticket.Number}}</p>\n<p dir="ltr">Should you have any questions in the meantime, just reply to this email and it will be attached to this ticket.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Regards,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
            },
            {
                title: 'Thanks for the feedback',
                content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We appreciate you taking the time to provide feedback on {{Product.Name}}.</p>\n<p dir="ltr">It sounds like it wasn&rsquo;t able to fully meet your expectations, for which we apologize. Rest assured our team looks at each piece of feedback and uses it to decide what to focus on next with {{Product.Name}}.</p>\n<p dir="ltr"><strong>&nbsp;</strong></p>\n<p dir="ltr">All the best, and let us know if there&rsquo;s anything else we can do to help.</p>\n<p dir="ltr">-{{Agent.FirstName}}</p>'
            },
            {
                title: 'Still working on case',
                content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">Just a quick note to let you know we&rsquo;re still working on your case. It&rsquo;s taking a bit longer than we hoped, but we&rsquo;re aiming to get you an answer in the next 48 hours.</p>\n<p dir="ltr">Stay tuned,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
            }
        ]
    },
    {
        title: 'Closing tickets',
        items: [
            {
                title: 'Closing ticket',
                content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We haven&rsquo;t heard back from you in over a week, so we have gone ahead and closed your ticket number {{Ticket.Number}}.</p>\n<p dir="ltr">If you&rsquo;re still running into issues, not to worry, just reply to this email and we will re-open your ticket.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">All the best,</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
            },
            {
                title: 'Post-call survey',
                content: '<p dir="ltr">Hey {{Customer.FirstName}}!</p>\n<p dir="ltr">&nbsp;</p>\n<p dir="ltr">How did we do?</p>\n<p dir="ltr">If you have a few moments, we&rsquo;d love you to fill out our post-support survey: {{Survey.Link}}</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks in advance!<br>{{Company.Name}} Customer Support</p>'
            }
        ]
    },
    {
        title: 'Product support',
        items: [
            {
                title: 'How to find model number',
                content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">My name is {{Agent.FirstName}} and I will be glad to assist you today.</p>\n<p dir="ltr">To troubleshoot your issue, we first need your model number, which can be found on the underside of your product beneath the safety warning label.&nbsp;</p>\n<p dir="ltr">It should look something like the following: XX.XXXXX.X</p>\n<p dir="ltr">Once you send it over, I will advise on next steps.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks!</p>\n<p dir="ltr">{{Agent.FirstName}}</p>'
            },
            {
                title: 'Support escalation',
                content: '<p dir="ltr">Hi {{Customer.FirstName}},</p>\n<p dir="ltr">We have escalated your ticket {{Ticket.Number}} to second-level support.</p>\n<p dir="ltr">You should hear back from the new agent on your case, {{NewAgent.FirstName}}, shortly.</p>\n<p><strong>&nbsp;</strong></p>\n<p dir="ltr">Thanks,</p>\n<p dir="ltr">{{Company.Name}} Customer Support</p>'
            }
        ]
    }
];